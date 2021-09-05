'use strict'

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




function makingUsername(acc) {

    acc.forEach(function (ac) {

        ac.username = ac.owner.split(' ').map(function (name) { return name[0] }).join('');
        ac.loanTaken = false;

    }
        
        
        )


}
//makeing usernames;
makingUsername(accounts);


function userData(personaccount,sort=false) {
    const mv = personaccount.movements;
    containerMovements.innerHTML = "";
    const mov = sort ? mv.slice().sort((a, b) => a - b):mv;
    mov.forEach(function (value, i) {

        let d_w = value > 0 ? 'deposit' : 'withdrawal';
        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${d_w}">${i + 1} ${d_w}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value} $</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);

    });
    const total = mov.reduce((acc, val) => acc + val);
    labelBalance.textContent = total+"$";
    labelSumIn.textContent = mov.filter(val => val > 0).reduce((acc, val) => acc + val);
    labelSumOut.textContent = mov.filter(val => val < 0).reduce((acc, val) => acc + val);
    labelSumInterest.textContent = mov.filter(val => val > 0).map(val => val * personaccount.interestRate / 100).filter(val => val > 1).reduce((acc, val) => acc + val);
}

btnLogin.addEventListener('click', function (e) {

    e.preventDefault();
    const user = inputLoginUsername.value;
    const pn = Number(inputLoginPin.value);

    const ac = accounts.find(function (acc) {

        return acc.username === user && acc.pin === pn;


    });
    
    if (ac) {
        containerApp.style.opacity = 100;
        userData(ac);



        inputLoginPin.blur();
        const firstnameOfUser = ac.owner.split(' ')[0];
        labelWelcome.textContent = 'welcome  ' + firstnameOfUser;

        btnTransfer.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("hi");
            let user = inputTransferTo.value;
            let amount = Number(inputTransferAmount.value);

            let transferaccount = accounts.find((acc) => acc.username === user);
            if (transferaccount) {
                console.log(labelBalance.textContent);
                let totalCurrentAccount = Number(labelBalance.textContent.slice(0, -1));
                if (totalCurrentAccount > amount) {
                    inputTransferTo.value = "";
                    inputTransferAmount.value = "";
                    ac.movements.push(-amount);
                    userData(ac);
                    transferaccount.movements.push(amount);


                }
                else {
                    console.log("invalid username");

                }
            }
            else {

                console.log("invalid account");
            }





        });

        btnClose.addEventListener('click', function (e) {
            e.preventDefault();
            //  console.log("hi");
            const username = inputCloseUsername.value;
            const pn = Number(inputClosePin.value);

            if (ac.username === username && ac.pin === pn) {
                const index = accounts.findIndex(function (ac) { return ac.username === username });
                console.log(index);
                accounts.splice(index, 1);
                inputCloseUsername.value = "";
                inputClosePin.value = "";
                containerApp.style.opacity = 0;



            }
            else {
                console.log("invalid username and password");

            }



        })

        btnLoan.addEventListener('click', function (e) {

            e.preventDefault();
            if (!ac.loanTaken) {
                const Lamount = Number(inputLoanAmount.value);

                const MinDepositCriteria = ac.movements.some((val) => val >= (Lamount * 0.1));

                if (MinDepositCriteria) {
                    ac.loanTaken = true;
                    ac.movements.push(Lamount);

                    userData(ac);

                }
                else {
                    console.log("criteria is not satisfied");

                }

            }
            else {

                console.log("loan already taken");

            }
            inputLoanAmount.value = "";


        });

        let sort = false;
        btnSort.addEventListener('click', function () {

           
            if (!sort) {
                sort = true;
                userData(ac, sort);
            }
            else {
                sort = false;
                userData(ac);

            }



        });
    }
        else
    console.log("invalid user");

    inputLoginPin.value = "";
    inputLoginUsername.value = "";
        
                
        






});




