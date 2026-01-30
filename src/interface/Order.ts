
export interface Order {
    index: number
    id: number
    owner: string
    ownerType: string
    client: string
    product: {id: number, name: string}[]
    createdTime: string
    expiredTime: string
    status: string
    amount: number
}
