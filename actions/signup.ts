"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";

export const SignUpAction = async (values : z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    console.log(validatedFields)
    
    if(!validatedFields.success) {
        return { error: "Invalid Fields!" } 
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return { error: "Email already exists" }
    }

    await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })

    // const allUsers = await db.user.findMany();
    // console.log(allUsers)

    return { success: "User created " }
}
