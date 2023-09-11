import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import { Link } from 'react-router-dom';

function NavItems() {
    const navList = [
        {id: 1,
        name: "Home",
        icon: <HomeIcon/>,
        link: "/",

        },
    {id: 2,
        name: "Transactions",
        icon: <CreditCardIcon/>,
        link: "/transactions",

        },
    {id: 3,
        name: "Accounts",
        icon: <AccountBalanceIcon/>,
        link: "/accounts",

        },
    {id: 4,
        name: "Budget",
        icon: <SavingsIcon/>,
        link: "/budget",

        }

    ]
  return (
    <div>
        {navList.map((item) => (
            <Link to={item.link} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem key={item.id} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>

            </ListItem>
            </Link>
        )
        )}
       </div>
  )
}

export default NavItems