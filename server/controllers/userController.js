import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async (req, res) => {
    let {email} = req.body
    const userExists = await prisma.user.findUnique({where: {email: email}})
    if (!userExists) {
        const user = await prisma.user.create({data: req.body})
        res.send({
            message: "User registered successfully.",
            user: user,
        })
    }
    else
        res.status(201).send({message: "User already registered."})
})

export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body
    const { id } = req.params
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        })
        if (alreadyBooked.bookedVisits.some( visit => visit.id === id )) {
            res.status(400).json({message: "You've already booked this place."})
        } else {
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            })
            res.send({message: "Booked successfully."})
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const bookings = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        })
        res.status(200).send(bookings)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        })
        const index = user.bookedVisits.findIndex( visit => visit.id === id )
        if (index === -1) {
            res.status(404).json({message: "Booking not found!"})
        } else {
            user.bookedVisits.splice(index, 1)
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Booking canceled successfully.")
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const manageFavourites = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {email: email}
        })
        if (user.favResidenciesID.includes(id)) {
            const updatedUser = await prisma.user.update({
                where: {email: email},
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter( rid => rid !== id )
                    }
                }
            })
            res.send({message: "Removed from favourites.", user: updatedUser})
        } else {
            const updatedUser = await prisma.user.update({
                where: {email: email},
                data: {
                    favResidenciesID: {
                        push: id
                    }
                }
            })
            res.send({message: "Added to favourites.", user: updatedUser})
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllFavourites = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const favResidenciesID = await prisma.user.findUnique({
            where: {email: email},
            select: {favResidenciesID: true}
        })
        res.status(200).send(favResidenciesID)
    } catch (err) {
        throw new Error(err.message)
    }
})