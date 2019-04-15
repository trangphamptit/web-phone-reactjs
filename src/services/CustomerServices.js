import Axios from "axios";


function getAllCustomers(){
    return Axios.get('https://api-mobile-shopping.herokuapp.com/api/customers/');
}

function createCustomer(customer){
    let data = {
        gender: 1,
        first_name: "Hello",
        last_name: "My Friend",
        email_address: "hello@gmail.com",
        login_name: "hello",
        login_password: "123"
    };
    let auth = {
        username: 'admin',
        password: 'admin'
    };

    Axios.post('https://api-mobile-shopping.herokuapp.com/api/customers/', 
                data, 
                {auth: auth}).then(function(response) {
                        console.log('Authenticated');
                    }).catch(function(error) {
                        console.log('Error on Authentication');
                    });

}

function login(email, password){
    let data = {
        email,
        password
    };
    let auth = {
        username: 'admin',
        password: 'admin'
    };
    console.log(data)
    Axios.post("https://api-mobile-shopping.herokuapp.com/api/customers/login",
                data,
                {auth: auth}).then(function(response){
                    alert(response.status);
                })
}   

export { login, getAllCustomers, createCustomer };