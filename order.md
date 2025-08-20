ордер который получаем с помошью  const order = await sdk.api.getOrder
{
  cancelled: false,
  clientSignature: undefined,
  closingDate: "2025-09-19T08:50:32",
  createdDate: "2025-08-20T08:50:34.671000",
  currentPrice: 10000000000n,
  expirationTime: 1758271832,
  finalized: false,
  listingTime: 1755679834,
  maker: {
    address: '0x888ff9fb31d177936d633c61f5a29ce941ab541b',
    username: undefined,
    profileImageUrl: undefined,
    bannerImageUrl: undefined,
    website: undefined,
    // ...other fields
  },
  makerFees: [],
  markedInvalid: false,
  orderHash: "0xe160025f2144cbf258fdda3e7da1a0918f536ae81c5d019ad01852f6d9e90254",
  orderType: "basic",
  protocolAddress: "0x0000000000000068f116a894984e2db1123eb395",
  protocolData: {
    parameters: {/* ... */},
    signature: '0x56e6308136e62bc7be329f487384f0f52a674a194916f601…31e2ce173dea48a466778208774795bad3a1d84bb979b54b6'
  },
  remainingQuantity: 1,
  side: "ask",
  taker: null,
  takerFees: []
}


то что ожидает const response = await sdk.fulfillOrder
в параметре order

fulfillOrder({ order, accountAddress, recipientAddress, domain, overrides, }: {
        order: OrderV2 | Order;
        accountAddress: string;
        recipientAddress?: string;
        domain?: string;
        overrides?: Overrides;
    }): Promise<string>;

/**
 * The latest OpenSea Order schema.
 */
export type OrderV2 = {
  /** The date the order was created. */
  createdDate: string;
  /** The date the order was closed. */
  closingDate: string | null;
  /** The date the order was listed. Order can be created before the listing time. */
  listingTime: number;
  /** The date the order expires. */
  expirationTime: number;
  /** The hash of the order. */
  orderHash: string | null;
  /** The account that created the order. */
  maker: OpenSeaAccount;
  /** The account that filled the order. */
  taker: OpenSeaAccount | null;
  /** The protocol data for the order. Only 'seaport' is currently supported. */
  protocolData: ProtocolData;
  /** The contract address of the protocol. */
  protocolAddress: string;
  /** The current price of the order. */
  currentPrice: bigint;
  /** The maker fees for the order. */
  makerFees: OrderFee[];
  /** The taker fees for the order. */
  takerFees: OrderFee[];
  /** The side of the order. Listing/Offer */
  side: OrderSide;
  /** The type of the order. Basic/English/Criteria */
  orderType: OrderType;
  /** Whether or not the maker has cancelled the order. */
  cancelled: boolean;
  /** Whether or not the order is finalized. */
  finalized: boolean;
  /** Whether or not the order is marked invalid and therefore not fillable. */
  markedInvalid: boolean;
  /** The signature the order is signed with. */
  clientSignature: string | null;
  /** Amount of items left in the order which can be taken. */
  remainingQuantity: number;
};


/**
 * Base Order type shared between Listings and Offers.
 * @category API Models
 */
export type Order = {
  /** Offer Identifier */
  order_hash: string;
  /** Chain the offer exists on */
  chain: string;
  /** The protocol data for the order. Only 'seaport' is currently supported. */
  protocol_data: ProtocolData;
  /** The contract address of the protocol. */
  protocol_address: string;
  /** The price of the order. */
  price: Price;
};
