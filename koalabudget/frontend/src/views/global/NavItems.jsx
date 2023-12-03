import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BugReportIcon from '@mui/icons-material/BugReport';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';

// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';









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

        },
        
    {id: 5,
        name: "Reports",
        icon: <SpeedIcon/>,
        link: "/reports",

        },
        // {id: 6,
        // name: "Goals",
        // icon: <DeviceThermostatIcon/>,
        // link: "/goals",

        // },
        {id: 7,
            name: "Settings",
            icon: <SettingsIcon/>,
            link: "/settings",
    
        },
        {id: 8,
        name: "Tests",
        icon: <BugReportIcon/>,
        link: "/tests",
    
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