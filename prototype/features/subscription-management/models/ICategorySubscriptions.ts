/**
 * Represents a subscription to a category. A unique id is needed due to the
 * possibility that the user has multiple separate subscriptions to the same
 * category.
 */
export type ICategorySubscriptions = {
  /**
   * Subscription instance ID.
   */
  subscriptionID: string;

  /**
   * Category ID.
   */
  categoryID: string;

  /**
   * The exam quantity index.
   */
  quantityIndex: number;
}[];
