import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

//User is Parent component
//UserForm is child component

const users= [
    {
        id: 1,
        name: 'Rashen'
    },
    {
        id: 2,
        name: 'Tharaka'
    }
];

//Data handle part is do Parent component
const Users = () => {
    return(
        <Box sx={{width: 'calc(100%-100px)', margin: 'auto', marginTop: '100px'}}>
            <UserForm />
            <UsersTable rows={users}/>
        </Box>
        
    )

}

export default Users; 