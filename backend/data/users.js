import bcryptjs from 'bcryptjs'


const user= [
    {
        name:'Nagesh',
        email:'nageshraoj@gmail.com',
        password: bcryptjs.hashSync('nagesh123',10) ,
        isAdmin:true
    },
    {
        name:'Tarun',
        email:'tarunjakkuva@gmail.com',
        password:bcryptjs.hashSync('tarun123',10)
    },
    {
        name:'Barath',
        email:'barathjakkuva@gmail.com',
        password: bcryptjs.hashSync('barath123',10)
    }
]

export default user;