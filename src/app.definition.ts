export interface destination { name?: string, description?: string, lat?: number, lng?: number, order?: number, file?: File};


export interface DetourPost {
    _id: string,
    title: string,
    postedBy?: string, 
    profilePictureUrl?: string,
    description?: string,
}

export interface GenericResponse {
    result : 'SUCCESS' | 'FAILED',
    data : any
}