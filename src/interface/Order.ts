
export interface Order {
    index: number
    id: number
    owner: string
    client: string
    product: {id: number, name: string}[]
    created_date: string
    expired_date: string
    status: string
    amount: number
}
