var pool = require('./pool');


async function getCustomer(id=-1) {

    return new Promise((resolve, reject)=>{

        if(id == -1) {
            pool.query('SELECT * FROM customers ',  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        }

        else {
            let query = "SELECT * FROM customers where customer_id=" + id ;   
            pool.query(query,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        }
    });
};

async function insertCustomer(body) {

    return new Promise((resolve, reject)=>{

        var q = pool.query('insert into customers set ?', body, (error, elements)=>{
            if(error){
                console.log("sql query", q.sql)
                return reject(error);
            }
            console.log("sql query", q.sql)
            return resolve(elements);
        });

    });
};

async function updateCustomer(body, id) {

    return new Promise((resolve, reject)=>{

        var q = pool.query('update customers set ? where customer_id=?', [body, id], (error, elements)=>{
            if(error){
                console.log("sql query", q.sql)
                return reject(error);
            }
            console.log("sql query", q.sql)
            return resolve(elements);
        });

    });
};

async function deleteCustomer(id) {

    return new Promise((resolve, reject)=>{

        var q = pool.query('delete from customers where customer_id=?', id, (error, elements)=>{
            if(error){
                console.log("sql query", q.sql)
                return reject(error);
            }
            console.log("sql query", q.sql)
            return resolve(elements);
        });

    });
};

async function getCustomerEmployee(id) {

    return new Promise((resolve, reject)=>{


        let query = "select employees.* from customers LEFT JOIN customeremployee on customers.customer_id=customeremployee.customer_id left join employees on customeremployee.employee_id=employees.employee_id where customers.customer_id=" + id ;   
        pool.query(query,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            console.log("elements---", elements);
            return resolve(elements);
        });

    });
};

module.exports = {getCustomer, insertCustomer, updateCustomer, deleteCustomer, getCustomerEmployee};