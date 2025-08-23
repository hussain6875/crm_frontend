class DealService{
    static BASE_URL = 'http://localhost:8080/api/deals';
    //static function to fetch the deals data by id
    static async getDealById(id){
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if(!response.ok){
            throw new Error('failed to fetch the deal by this id');
        }
        const data = response.json();
        console.log(data);
        return data;
        }
          //static function to fetch the deals data
          static async getDeals(){
            const response = await fetch(this.BASE_URL);
            if(!response.ok){
                throw new Error('failed to fetch the deal');
            }
            return response.json();
          }
          //static function to create a new Deal
          static async createDeal(data){
            const response = await fetch(this.BASE_URL,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',                    
                },
                body:JSON.stringify(data),                                
            })
            if(!response.ok){
                throw new Error('failed to create the new Deal');
            }
            return await response.json();
          }
}

export default DealService;