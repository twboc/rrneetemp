import { ISerpPage } from '../type/type' 

export const noContentBlockError = (organicResults: ISerpPage[]) => ({
    success: false,
    error: {
        type: 'NO_CONTENT_BLOCK',
        message: 'Google is not sending data on scroll down with more serp results due to too many requests.'
    },
    serp: organicResults
})