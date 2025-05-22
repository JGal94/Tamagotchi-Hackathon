#[starknet::interface]
pub trait IYourContract<TContractState> {
    // ERC-721 Standard Functions
    fn name(self: @TContractState) -> ByteArray;
    fn symbol(self: @TContractState) -> ByteArray;
    fn token_uri(self: @TContractState, token_id: u256) -> ByteArray;
    fn balance_of(self: @TContractState, owner: starknet::ContractAddress) -> u256;
    fn owner_of(self: @TContractState, token_id: u256) -> starknet::ContractAddress;
    fn transfer_from(
        ref self: TContractState,
        from: starknet::ContractAddress,
        to: starknet::ContractAddress,
        token_id: u256
    );
    fn approve(ref self: TContractState, to: starknet::ContractAddress, token_id: u256);
    fn get_approved(self: @TContractState, token_id: u256) -> starknet::ContractAddress;
    fn set_approval_for_all(
        ref self: TContractState,
        operator: starknet::ContractAddress,
        approved: bool
    );
    fn is_approved_for_all(
        self: @TContractState,
        owner: starknet::ContractAddress,
        operator: starknet::ContractAddress
    ) -> bool;
    
    // Tamagotchi Specific Functions
    fn mint_tamagotchi(ref self: TContractState, to: starknet::ContractAddress) -> u256;
    fn feed_tamagotchi(ref self: TContractState, token_id: u256);
    fn play_with_tamagotchi(ref self: TContractState, token_id: u256);
    fn tick_time(ref self: TContractState, token_id: u256);
    fn get_tamagotchi_stats(self: @TContractState, token_id: u256) -> (u8, u8, u8, u8, u64, u64, bool);
    fn get_tamagotchi_health(self: @TContractState, token_id: u256) -> u8;
    fn get_tamagotchi_hunger(self: @TContractState, token_id: u256) -> u8;
    fn get_tamagotchi_happiness(self: @TContractState, token_id: u256) -> u8;
    fn get_tamagotchi_rarity(self: @TContractState, token_id: u256) -> u8;
    fn is_alive(self: @TContractState, token_id: u256) -> bool;
    fn get_total_supply(self: @TContractState) -> u256;
    fn get_owner(self: @TContractState) -> starknet::ContractAddress;
}

#[starknet::contract]
pub mod YourContract {
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::num::traits::Zero;
    use super::IYourContract;

    // Constants
    const MAX_HEALTH: u8 = 100;
    const MAX_HUNGER: u8 = 100;
    const MAX_HAPPINESS: u8 = 100;
    const MIN_STAT: u8 = 0;
    const DEATH_THRESHOLD: u8 = 10;
    const FEED_HUNGER_REDUCTION: u8 = 30;
    const PLAY_HAPPINESS_INCREASE: u8 = 25;
    const DECAY_AMOUNT: u8 = 5;
    const TIME_DECAY_INTERVAL: u64 = 3600; // 1 hour

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        Transfer: Transfer,
        Approval: Approval,
        ApprovalForAll: ApprovalForAll,
        TamagotchiBorn: TamagotchiBorn,
        TamagotchiFed: TamagotchiFed,
        TamagotchiPlayed: TamagotchiPlayed,
        TamagotchiDied: TamagotchiDied,
        StatsDecayed: StatsDecayed,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Transfer {
        #[key]
        pub from: ContractAddress,
        #[key]
        pub to: ContractAddress,
        #[key]
        pub token_id: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Approval {
        #[key]
        pub owner: ContractAddress,
        #[key]
        pub approved: ContractAddress,
        #[key]
        pub token_id: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ApprovalForAll {
        #[key]
        pub owner: ContractAddress,
        #[key]
        pub operator: ContractAddress,
        pub approved: bool,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TamagotchiBorn {
        #[key]
        pub token_id: u256,
        #[key]
        pub owner: ContractAddress,
        pub rarity: u8,
        pub birth_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TamagotchiFed {
        #[key]
        pub token_id: u256,
        #[key]
        pub owner: ContractAddress,
        pub new_hunger: u8,
        pub timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TamagotchiPlayed {
        #[key]
        pub token_id: u256,
        #[key]
        pub owner: ContractAddress,
        pub new_happiness: u8,
        pub timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TamagotchiDied {
        #[key]
        pub token_id: u256,
        #[key]
        pub owner: ContractAddress,
        pub cause: ByteArray,
        pub timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct StatsDecayed {
        #[key]
        pub token_id: u256,
        pub health: u8,
        pub hunger: u8,
        pub happiness: u8,
        pub timestamp: u64,
    }

    #[storage]
    struct Storage {
        // Contract info
        contract_owner: ContractAddress,
        name: ByteArray,
        symbol: ByteArray,
        base_uri: ByteArray,
        
        // ERC-721 Standard
        token_owners: Map<u256, ContractAddress>,
        balances: Map<ContractAddress, u256>,
        token_approvals: Map<u256, ContractAddress>,
        operator_approvals: Map<(ContractAddress, ContractAddress), bool>,
        
        // Tamagotchi stats
        health: Map<u256, u8>,
        hunger: Map<u256, u8>,
        happiness: Map<u256, u8>,
        rarity: Map<u256, u8>,
        birth_time: Map<u256, u64>,
        last_interaction: Map<u256, u64>,
        is_alive: Map<u256, bool>,
        
        next_token_id: u256,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        name: ByteArray,
        symbol: ByteArray,
        base_uri: ByteArray,
    ) {
        self.contract_owner.write(owner);
        self.name.write(name);
        self.symbol.write(symbol);
        self.base_uri.write(base_uri);
        self.next_token_id.write(1);
    }

    #[abi(embed_v0)]
    impl YourContractImpl of IYourContract<ContractState> {
        // ERC-721 Standard Implementation
        fn name(self: @ContractState) -> ByteArray {
            self.name.read()
        }

        fn symbol(self: @ContractState) -> ByteArray {
            self.symbol.read()
        }

        fn token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            assert(self._exists(token_id), 'Token does not exist');
            let mut uri = self.base_uri.read();
            uri.append(@format!("{}", token_id));
            uri.append(@".json");
            uri
        }

        fn balance_of(self: @ContractState, owner: ContractAddress) -> u256 {
            assert(!owner.is_zero(), 'Query for zero address');
            self.balances.read(owner)
        }

        fn owner_of(self: @ContractState, token_id: u256) -> ContractAddress {
            let owner = self.token_owners.read(token_id);
            assert(!owner.is_zero(), 'Token does not exist');
            owner
        }

        fn transfer_from(
            ref self: ContractState,
            from: ContractAddress,
            to: ContractAddress,
            token_id: u256
        ) {
            assert(self._is_approved_or_owner(get_caller_address(), token_id), 'Not approved or owner');
            self._transfer(from, to, token_id);
        }

        fn approve(ref self: ContractState, to: ContractAddress, token_id: u256) {
            let owner = self.owner_of(token_id);
            assert(to != owner, 'Approval to current owner');
            
            let caller = get_caller_address();
            assert(
                caller == owner || self.is_approved_for_all(owner, caller),
                'Not authorized to approve'
            );
            
            self._approve(to, token_id);
        }

        fn get_approved(self: @ContractState, token_id: u256) -> ContractAddress {
            assert(self._exists(token_id), 'Token does not exist');
            self.token_approvals.read(token_id)
        }

        fn set_approval_for_all(
            ref self: ContractState,
            operator: ContractAddress,
            approved: bool
        ) {
            let caller = get_caller_address();
            assert(operator != caller, 'Approve to caller');
            
            self.operator_approvals.write((caller, operator), approved);
            
            self.emit(ApprovalForAll {
                owner: caller,
                operator,
                approved,
            });
        }

        fn is_approved_for_all(
            self: @ContractState,
            owner: ContractAddress,
            operator: ContractAddress
        ) -> bool {
            self.operator_approvals.read((owner, operator))
        }

        // Tamagotchi Functions
        fn mint_tamagotchi(ref self: ContractState, to: ContractAddress) -> u256 {
            let caller = get_caller_address();
            let owner = self.contract_owner.read();
            assert(caller == owner, 'Only owner can mint');
            assert(!to.is_zero(), 'Mint to zero address');
            
            let token_id = self.next_token_id.read();
            let current_time = get_block_timestamp();
            let rarity = self._generate_rarity(token_id, current_time);
            
            // Mint NFT
            self._mint(to, token_id);
            
            // Initialize Tamagotchi stats
            self.health.write(token_id, MAX_HEALTH);
            self.hunger.write(token_id, 50);
            self.happiness.write(token_id, 80);
            self.rarity.write(token_id, rarity);
            self.birth_time.write(token_id, current_time);
            self.last_interaction.write(token_id, current_time);
            self.is_alive.write(token_id, true);
            
            self.next_token_id.write(token_id + 1);

            self.emit(TamagotchiBorn {
                token_id,
                owner: to,
                rarity,
                birth_time: current_time,
            });

            token_id
        }

        fn feed_tamagotchi(ref self: ContractState, token_id: u256) {
            assert(self._is_approved_or_owner(get_caller_address(), token_id), 'Not owner or approved');
            assert(self.is_alive(token_id), 'Tamagotchi is dead');
            
            let mut hunger = self.hunger.read(token_id);
            if hunger >= FEED_HUNGER_REDUCTION {
                hunger -= FEED_HUNGER_REDUCTION;
            } else {
                hunger = MIN_STAT;
            }
            
            // Health boost if well fed
            if hunger < 20 {
                let mut health = self.health.read(token_id);
                if health < MAX_HEALTH {
                    health = if health + 5 > MAX_HEALTH { MAX_HEALTH } else { health + 5 };
                    self.health.write(token_id, health);
                }
            }
            
            self.hunger.write(token_id, hunger);
            self.last_interaction.write(token_id, get_block_timestamp());

            self.emit(TamagotchiFed {
                token_id,
                owner: get_caller_address(),
                new_hunger: hunger,
                timestamp: get_block_timestamp(),
            });
        }

        fn play_with_tamagotchi(ref self: ContractState, token_id: u256) {
            assert(self._is_approved_or_owner(get_caller_address(), token_id), 'Not owner or approved');
            assert(self.is_alive(token_id), 'Tamagotchi is dead');
            
            let mut happiness = self.happiness.read(token_id);
            if happiness + PLAY_HAPPINESS_INCREASE <= MAX_HAPPINESS {
                happiness += PLAY_HAPPINESS_INCREASE;
            } else {
                happiness = MAX_HAPPINESS;
            }
            
            // Playing increases hunger
            let mut hunger = self.hunger.read(token_id);
            if hunger + 10 <= MAX_HUNGER {
                hunger += 10;
            } else {
                hunger = MAX_HUNGER;
            }
            
            // Health boost if happy
            if happiness > 80 {
                let mut health = self.health.read(token_id);
                if health < MAX_HEALTH {
                    health = if health + 3 > MAX_HEALTH { MAX_HEALTH } else { health + 3 };
                    self.health.write(token_id, health);
                }
            }
            
            self.happiness.write(token_id, happiness);
            self.hunger.write(token_id, hunger);
            self.last_interaction.write(token_id, get_block_timestamp());

            self.emit(TamagotchiPlayed {
                token_id,
                owner: get_caller_address(),
                new_happiness: happiness,
                timestamp: get_block_timestamp(),
            });
        }

        fn tick_time(ref self: ContractState, token_id: u256) {
            assert(self._exists(token_id), 'Token does not exist');
            assert(self.is_alive(token_id), 'Tamagotchi already dead');
            
            let current_time = get_block_timestamp();
            let last_interaction = self.last_interaction.read(token_id);
            let time_passed = current_time - last_interaction;
            
            if time_passed >= TIME_DECAY_INTERVAL {
                let decay_cycles = time_passed / TIME_DECAY_INTERVAL;
                let total_decay: u8 = (decay_cycles * DECAY_AMOUNT.into()).try_into().unwrap();
                
                // Decay stats
                let mut happiness = self.happiness.read(token_id);
                let mut health = self.health.read(token_id);
                let mut hunger = self.hunger.read(token_id);
                
                if happiness >= total_decay {
                    happiness -= total_decay;
                } else {
                    happiness = MIN_STAT;
                }
                
                if health >= total_decay {
                    health -= total_decay;
                } else {
                    health = MIN_STAT;
                }
                
                if hunger + total_decay <= MAX_HUNGER {
                    hunger += total_decay;
                } else {
                    hunger = MAX_HUNGER;
                }
                
                // Check for death
                let mut death_cause = "";
                let mut died = false;
                
                if health <= DEATH_THRESHOLD {
                    died = true;
                    death_cause = "Poor health";
                } else if hunger >= (MAX_HUNGER - DEATH_THRESHOLD) {
                    died = true;
                    death_cause = "Starvation";
                }
                
                // Update stats
                self.happiness.write(token_id, happiness);
                self.health.write(token_id, health);
                self.hunger.write(token_id, hunger);
                
                if died {
                    self.is_alive.write(token_id, false);
                    self.emit(TamagotchiDied {
                        token_id,
                        owner: self.owner_of(token_id),
                        cause: death_cause,
                        timestamp: current_time,
                    });
                } else {
                    self.emit(StatsDecayed {
                        token_id,
                        health,
                        hunger,
                        happiness,
                        timestamp: current_time,
                    });
                }
            }
        }

        fn get_tamagotchi_stats(self: @ContractState, token_id: u256) -> (u8, u8, u8, u8, u64, u64, bool) {
            assert(self._exists(token_id), 'Token does not exist');
            
            let health = self.health.read(token_id);
            let hunger = self.hunger.read(token_id);
            let happiness = self.happiness.read(token_id);
            let rarity = self.rarity.read(token_id);
            let birth_time = self.birth_time.read(token_id);
            let last_interaction = self.last_interaction.read(token_id);
            let is_alive = self.is_alive.read(token_id);
            
            (health, hunger, happiness, rarity, birth_time, last_interaction, is_alive)
        }

        fn get_tamagotchi_health(self: @ContractState, token_id: u256) -> u8 {
            assert(self._exists(token_id), 'Token does not exist');
            self.health.read(token_id)
        }

        fn get_tamagotchi_hunger(self: @ContractState, token_id: u256) -> u8 {
            assert(self._exists(token_id), 'Token does not exist');
            self.hunger.read(token_id)
        }

        fn get_tamagotchi_happiness(self: @ContractState, token_id: u256) -> u8 {
            assert(self._exists(token_id), 'Token does not exist');
            self.happiness.read(token_id)
        }

        fn get_tamagotchi_rarity(self: @ContractState, token_id: u256) -> u8 {
            assert(self._exists(token_id), 'Token does not exist');
            self.rarity.read(token_id)
        }

        fn is_alive(self: @ContractState, token_id: u256) -> bool {
            assert(self._exists(token_id), 'Token does not exist');
            self.is_alive.read(token_id)
        }

        fn get_total_supply(self: @ContractState) -> u256 {
            self.next_token_id.read() - 1
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.contract_owner.read()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _exists(self: @ContractState, token_id: u256) -> bool {
            !self.token_owners.read(token_id).is_zero()
        }

        fn _mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
            assert(!to.is_zero(), 'Mint to zero address');
            assert(!self._exists(token_id), 'Token already exists');
            
            let balance = self.balances.read(to);
            self.balances.write(to, balance + 1);
            self.token_owners.write(token_id, to);
            
            self.emit(Transfer {
                from: Zero::zero(),
                to,
                token_id,
            });
        }

        fn _transfer(ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256) {
            assert(self.owner_of(token_id) == from, 'Transfer from incorrect owner');
            assert(!to.is_zero(), 'Transfer to zero address');
            
            // Clear approvals
            self._approve(Zero::zero(), token_id);
            
            // Update balances
            let from_balance = self.balances.read(from);
            self.balances.write(from, from_balance - 1);
            
            let to_balance = self.balances.read(to);
            self.balances.write(to, to_balance + 1);
            
            // Transfer ownership
            self.token_owners.write(token_id, to);
            
            self.emit(Transfer { from, to, token_id });
        }

        fn _approve(ref self: ContractState, to: ContractAddress, token_id: u256) {
            self.token_approvals.write(token_id, to);
            
            self.emit(Approval {
                owner: self.owner_of(token_id),
                approved: to,
                token_id,
            });
        }

        fn _is_approved_or_owner(self: @ContractState, spender: ContractAddress, token_id: u256) -> bool {
            assert(self._exists(token_id), 'Token does not exist');
            let owner = self.owner_of(token_id);
            spender == owner 
                || self.get_approved(token_id) == spender 
                || self.is_approved_for_all(owner, spender)
        }

        fn _generate_rarity(self: @ContractState, token_id: u256, timestamp: u64) -> u8 {
            let seed = token_id.low + timestamp.into();
            let rand = seed % 100;
            
            if rand < 50 {
                0_u8 // Common (50%)
            } else if rand < 80 {
                1_u8 // Rare (30%)
            } else if rand < 95 {
                2_u8 // Epic (15%)
            } else {
                3_u8 // Legendary (5%)
            }
        }
    }
}