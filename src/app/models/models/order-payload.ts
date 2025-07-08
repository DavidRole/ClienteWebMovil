export interface OrderPayload {
    items: Array<{ dishId: number; quantity: number }>;
}
