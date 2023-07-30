import React from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import { AiFillHeart } from 'react-icons/ai'

import { getProperty } from '../../utils/api'

import './Property.css'

const Property = () => {

    const { pathname } = useLocation()
    const id = pathname.split("/").slice(-1)[0]
    const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id))

    if (isLoading) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <span>Error while fetching the property details.</span>
                </div>
            </div>
        )
    }

    return (
        <div className="wrapper">
            <div className="flexColStart paddings innerWidth p-container">
                <div className="like">
                    <AiFillHeart size={24} color='white' />
                </div>
                <img src={data?.image} alt="Home Image" />
            </div>
        </div>
    )
}

export default Property