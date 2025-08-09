class UserService{
        static BASE_URL = 'http://localhost:8080/api/users';
        //static function to fetch the users data
          static async getUsers(){
            const response = await fetch(this.BASE_URL);
            if(!response.ok){
                throw new Error('failed to fetch the users');
            }
            return response.json();
          }
}
export default UserService;