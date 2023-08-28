// export const data = [{
//     id:1,
//     name:'john',
//     email:'joh@gmail.com',
//     balance:3000,
//     registration:10-07-2020,06:35 PM
//     status:true,
// }]

interface data {
  id: string;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
  key: string,
  action: () => JSX.Element;
}

const generateRandomDates = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 100));
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  return date;
}

export const data: data[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    "name": "John" + (i + 1),
    "email": "John" + (i + 1) + "@gmail.com",
    "balance": Math.floor((Math.random() * 9000)) + 1000,
    "id": `${i}`,
    "active": false,
    "registerAt": generateRandomDates(),
    "key": `${i}`,
    "action": () => (
      <>
        <button>delete</button>
        <button>edit</button>
      </>
    )
  });
}


