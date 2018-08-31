// const STORGE_KEY='token'
export default{
    save(key){
    	sessionStorage.setItem('token', JSON.stringify(key));
    },

    fetch(){
    	return JSON.parse(sessionStorage.getItem('token') || '[]') ;
    },
    del(){
        sessionStorage.removeItem('token');
    }
    
}