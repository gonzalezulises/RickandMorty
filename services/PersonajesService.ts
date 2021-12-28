import ICharacterFilter from '../Interfaces/ICharacterFilter'
const APIURL = 'https://rickandmortyapi.com/api/character'


const getAll = async (currentPage : number = 1, filters?:ICharacterFilter) => { 

    let filterParams = "";
    filterParams += `${filters?.name && filters?.name.length>2 ? "&name="+filters.name:""}`;
    filterParams += `${filters?.species && filters?.species.length>2 ? "&species="+filters.species:""}`;
    filterParams += `${filters?.type && filters?.type.length>2 ? "&type="+filters.type:""}`;
    filterParams += filters?.gender? `&gender=${filters.gender}` : "";
    filterParams += filters?.status? `&status=${filters.status}` : "";
    console.log({filterParams});
    


    const resp = await fetch(`${APIURL}/?page=${currentPage}${filterParams}`);
    return resp.json();
}

const get : any = async (id:any) => {
    try {
        const resp = await fetch(`${APIURL}/${id}`);
        return resp.json();
    } catch (error) {
        await timeout(1000)
        return await get(id);
    }
}


function timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export  default{
    getAll,
    get
}