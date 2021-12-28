export default interface Character {
    id: number,
    name: string,
    type: string,
    gender: string,
    image: string,
    status: string,
    species: string,
    origin: {
        name: string,
        url:string
    },
    location: {
        name: string,
        url:string
    },
    episode:string[],
    created: string,
}
