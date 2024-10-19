import mongoose from "mongoose";
export const connection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://elgyuoshy:LLHiZciSMMnyBiZ3@auramoms.kadgs.mongodb.net/?retryWrites=true&w=majority&appName=AuraMoms" || process.env.MONGO_URL_CONNECTION
    )
    .then(() => console.log("AurMoms MongoDB Connected"))
    .catch((err) => console.log(err));
};

