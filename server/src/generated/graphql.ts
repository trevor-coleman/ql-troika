import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};










export type AuthToken = {
  __typename?: 'AuthToken';
  token?: Maybe<Scalars['String']>;
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['ID'];
  owner: Scalars['ID'];
  name: Scalars['String'];
  game: Scalars['ID'];
  inventory?: Maybe<Array<Item>>;
  luck?: Maybe<Quantity>;
  skill?: Maybe<Quantity>;
  stamina?: Maybe<Quantity>;
  special?: Maybe<Scalars['String']>;
  sort_name?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Skill>>;
  background?: Maybe<Scalars['String']>;
  portrait?: Maybe<Scalars['String']>;
};

export type CustomSize = {
  __typename?: 'CustomSize';
  size: Scalars['Int'];
};

export type Damage = {
  __typename?: 'Damage';
  damagesAs?: Maybe<Scalars['String']>;
  damage?: Maybe<Array<Scalars['Int']>>;
  twoHanded?: Maybe<Scalars['Boolean']>;
  ranged?: Maybe<Scalars['Boolean']>;
  armourPiercing?: Maybe<Scalars['Boolean']>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  name: Scalars['String'];
  sort_name: Scalars['String'];
  characters: Array<Scalars['ID']>;
  owner: Scalars['ID'];
  players: Array<Scalars['ID']>;
  discordWebhook?: Maybe<Webhook>;
  slug?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  owner: Scalars['ID'];
  name: Scalars['String'];
  sort_name: Scalars['String'];
  skill: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  charges?: Maybe<Quantity>;
  damage?: Maybe<Damage>;
  protection?: Maybe<Protection>;
  customSize?: Maybe<CustomSize>;
  modifiers?: Maybe<Array<Modifier>>;
};

export type Modifier = {
  __typename?: 'Modifier';
  skill: Scalars['ID'];
  adjustment: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};

export type Protection = {
  __typename?: 'Protection';
  protectsAs?: Maybe<Scalars['Int']>;
  protection: Scalars['Int'];
};

export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['ID'];
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  current: Scalars['Int'];
  initial?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  hello: Scalars['String'];
  user?: Maybe<User>;
  me?: Maybe<User>;
  signIn?: Maybe<AuthToken>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QuerySignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Roll = {
  __typename?: 'Roll';
  dialogDetail?: Maybe<Scalars['String']>;
  dialogResult?: Maybe<Scalars['String']>;
  dice?: Maybe<Array<Scalars['Int']>>;
  discordDescription?: Maybe<Scalars['String']>;
  discordResult?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  roll?: Maybe<Array<Maybe<Scalars['Int']>>>;
  rolledSkill?: Maybe<Scalars['String']>;
  rollerKey?: Maybe<Scalars['ID']>;
  rollerName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  rolledWeapon?: Maybe<Scalars['String']>;
  weaponKey?: Maybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['ID'];
  owner: Scalars['ID'];
  name: Scalars['String'];
  sort_name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  spell?: Maybe<Spell>;
  rank?: Maybe<Scalars['Int']>;
};

export type Spell = {
  __typename?: 'Spell';
  staminaCost: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  email: Scalars['String'];
  games?: Maybe<Array<Scalars['ID']>>;
  characters?: Maybe<Array<Scalars['ID']>>;
};

export type UserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Webhook = {
  __typename?: 'Webhook';
  type: Scalars['String'];
  url: Scalars['String'];
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthToken: ResolverTypeWrapper<AuthToken>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Character: ResolverTypeWrapper<Character>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CustomSize: ResolverTypeWrapper<CustomSize>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Damage: ResolverTypeWrapper<Damage>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Game: ResolverTypeWrapper<Game>;
  Item: ResolverTypeWrapper<Item>;
  Modifier: ResolverTypeWrapper<Modifier>;
  Mutation: ResolverTypeWrapper<{}>;
  Protection: ResolverTypeWrapper<Protection>;
  Quantity: ResolverTypeWrapper<Quantity>;
  Query: ResolverTypeWrapper<{}>;
  Roll: ResolverTypeWrapper<Roll>;
  Skill: ResolverTypeWrapper<Skill>;
  Spell: ResolverTypeWrapper<Spell>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  Webhook: ResolverTypeWrapper<Webhook>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthToken: AuthToken;
  String: Scalars['String'];
  Character: Character;
  ID: Scalars['ID'];
  CustomSize: CustomSize;
  Int: Scalars['Int'];
  Damage: Damage;
  Boolean: Scalars['Boolean'];
  Game: Game;
  Item: Item;
  Modifier: Modifier;
  Mutation: {};
  Protection: Protection;
  Quantity: Quantity;
  Query: {};
  Roll: Roll;
  Skill: Skill;
  Spell: Spell;
  User: User;
  UserInput: UserInput;
  Webhook: Webhook;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthToken'] = ResolversParentTypes['AuthToken']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventory?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  luck?: Resolver<Maybe<ResolversTypes['Quantity']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Quantity']>, ParentType, ContextType>;
  stamina?: Resolver<Maybe<ResolversTypes['Quantity']>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sort_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<ResolversTypes['Skill']>>, ParentType, ContextType>;
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  portrait?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomSize'] = ResolversParentTypes['CustomSize']> = {
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DamageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Damage'] = ResolversParentTypes['Damage']> = {
  damagesAs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  damage?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  twoHanded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ranged?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  armourPiercing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sort_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characters?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  discordWebhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sort_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  charges?: Resolver<Maybe<ResolversTypes['Quantity']>, ParentType, ContextType>;
  damage?: Resolver<Maybe<ResolversTypes['Damage']>, ParentType, ContextType>;
  protection?: Resolver<Maybe<ResolversTypes['Protection']>, ParentType, ContextType>;
  customSize?: Resolver<Maybe<ResolversTypes['CustomSize']>, ParentType, ContextType>;
  modifiers?: Resolver<Maybe<Array<ResolversTypes['Modifier']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['Modifier'] = ResolversParentTypes['Modifier']> = {
  skill?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  adjustment?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
};

export type ProtectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Protection'] = ResolversParentTypes['Protection']> = {
  protectsAs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  protection?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quantity'] = ResolversParentTypes['Quantity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  current?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  initial?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  signIn?: Resolver<Maybe<ResolversTypes['AuthToken']>, ParentType, ContextType, RequireFields<QuerySignInArgs, 'email' | 'password'>>;
};

export type RollResolvers<ContextType = any, ParentType extends ResolversParentTypes['Roll'] = ResolversParentTypes['Roll']> = {
  dialogDetail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dialogResult?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dice?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  discordDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discordResult?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  roll?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  rolledSkill?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rollerKey?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  rollerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rolledWeapon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weaponKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sort_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spell?: Resolver<Maybe<ResolversTypes['Spell']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellResolvers<ContextType = any, ParentType extends ResolversParentTypes['Spell'] = ResolversParentTypes['Spell']> = {
  staminaCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  games?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  characters?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthToken?: AuthTokenResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CustomSize?: CustomSizeResolvers<ContextType>;
  Damage?: DamageResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Modifier?: ModifierResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Protection?: ProtectionResolvers<ContextType>;
  Quantity?: QuantityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Roll?: RollResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  Spell?: SpellResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';