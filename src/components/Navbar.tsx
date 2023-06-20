import React, { useState, useEffect } from 'react'
import {
    Navbar,

} from "@material-tailwind/react";
import "../assets/styles/styles.css";
import logo from "../assets/images/logo.png"
interface Props {

}

const Header = (props: Props) => {
    const [applicant, setApplicant] = useState({
        name: "",
        lastName: ""
    })
    useEffect(() => {
        setApplicant({
            name: "marwane",
            lastName: "akef"
        })
    }, [])
    return (
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <img className="img-class-logo-styles" src={logo} alt="" />
                <div>
                    <span className="d-flex d-m-block justify-content-between">




                        {applicant.name}{" "}{applicant.lastName}
                    </span>

                </div>
            </div>
        </Navbar>
    );
}

export default Header
