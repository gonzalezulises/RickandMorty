import ILocationFilter from '../Interfaces/ILocationFilter'
const APIURL = 'https://rickandmortyapi.com/api/location'


const getAll = async (currentPage : number = 1, filters?:ILocationFilter) => { 

    let filterParams = "";
    filterParams += `${filters?.name && filters?.name.length>2 ? "&name="+filters.name:""}`;
    filterParams += `${filters?.type && filters?.type.length>2 ? "&type="+filters.type:""}`;
    filterParams += `${filters?.dimension && filters?.dimension.length>2 ? "&dimension="+filters.dimension:""}`;
    
    const resp = await fetch(`${APIURL}/?page=${currentPage}${filterParams}`);
    return resp.json();
}

const get = async (id:any) => {
    const resp = await fetch(`${APIURL}/${id}`);
    return resp.json();
}

export  default{
    getAll,
    get
}