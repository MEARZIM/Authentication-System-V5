import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET () {
    const role = await currentUserRole();
    if (role === UserRole.ADMIN) {
        return NextResponse.json("success", {status: 200})
    }
    return new NextResponse("error", {status:403});
}