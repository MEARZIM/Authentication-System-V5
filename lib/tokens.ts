import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

export const generateVerificationToken = async (
    email: string,
) => {
    const token = uuidv4();
    /**
     * Expire the token in 1 hour
     */
    const expireTime = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires: expireTime,
        }
    })
    return verificationToken
}

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();

    const expireTime = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires: expireTime,
        }
    })
    return passwordResetToken
}