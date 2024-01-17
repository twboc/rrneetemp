
export interface IOrderParams {
    query: string
    adTest: string
    hl: string
    device: string
    location: string
}

export interface IOrder {
    params: IOrderParams
}

export interface ICrawlResult {
    success: boolean,
    serp: ISerpPage[]
    error?: {
        type?: string
        e?: Error
    }
}

export interface ISerpPage {
    url: string
    title: string
    description: string
}

export interface ILocations {
    [key: string]: string
}