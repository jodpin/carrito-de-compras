import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jbulldehngymvdsfenxc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidWxsZGVobmd5bXZkc2ZlbnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk5NjI1MDIsImV4cCI6MTk3NTUzODUwMn0.fYd2ZuLim2inz1qT4YhIwDfBZD8-LsmtrFpiqwBs7Xs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export async function createUser(form) {

  try {
    await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
  
    const { error } = await supabase.from("usuarios-compra-ya").insert([
      {
        name: form.name,
        username: form.user,
        address: form.address,
        email: form.email,
      },
    ]);
    if(error) throw error;
    
  } catch (error) {
    console.log(error);
  }
 
}

export const takeInfoToSendOrder = async ({ email }) => {
  try {
    const { data, error } = await supabase
      .from("usuarios-compra-ya")
      .select("address")
      .eq("email", email);

    if (error) throw error;

    return { data, error };

  } catch (error) {
    console.log(error);
  }
};
