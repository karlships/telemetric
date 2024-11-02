"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleWaitlistSubmission(formData: FormData) {
    const supabase = createClient();

    try {
        const email = formData.get("email");
        if (!email || typeof email !== "string") {
            throw new Error("Invalid email");
        }

        const { error: insertError } = await supabase
            .from("emails")
            .insert([{
                email: email,
            }]);

        if (insertError) {
            throw insertError;
        }

        // You might want to revalidate the page or show a success message
        // revalidatePath('/homepage');
    } catch (error) {
        console.error("Error submitting to waitlist:", error);
        throw error;
    }
}
