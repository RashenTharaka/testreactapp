import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

// User is Parent component, UserForm is child component

// Data handle part is done in Parent component
const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    // componentDidMount life cycle method
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get(process.env.REACT_APP_ENDPOINT + '/api/users')
            .then(response => {
                setUsers(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        };

        Axios.post(
            process.env.REACT_APP_ENDPOINT + '/api/createuser',
            payload
        )
            .then(() => {
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
                setSubmitted(false);
            });
    };

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        };

        Axios.post(
            process.env.REACT_APP_ENDPOINT + '/api/updateuser',
            payload
        )
            .then(() => {
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
                setSubmitted(false);
            });
    };

    const deleteUser = (id) => {
        Axios.post(
            process.env.REACT_APP_ENDPOINT + '/api/deleteuser',
            { id: id }
        )
            .then(() => {
                getUsers();
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px'
            }}
        >
            <UserForm
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />

            <UsersTable
                rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={deleteUser}
            />
        </Box>
    );
};

export default Users;