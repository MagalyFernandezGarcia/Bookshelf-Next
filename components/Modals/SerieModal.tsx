"use client";

import { lendSerie } from "@/app/db.service";
import { useForm } from "react-hook-form";

type Lend = {
  borrower: string;
  date: string;
};

const SerieModal = ({id,onSetModal} : {id:number,onSetModal:() => void}) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Lend>();

  const onSubmit = (data: Lend) => {
   const date=new Date(data.date)
    try {
        lendSerie(id,data.borrower,date.toISOString(),true)
        onSetModal()
        
    } catch (error) {
        console.log(error);
        
        
    }
  }

  return (
    <section className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
      <form className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%]  lg:w-[600px]" onSubmit={handleSubmit(onSubmit)}>
        <div  className="flex flex-col">
        <p className="mb-2">Prêté à :</p>
          <label htmlFor="borrower" className="text-xs ps-16">
          Emprunteur
            
          </label>
            <input
              type="text"
              id="borrower"
              {...register("borrower")}
              placeholder="Jerme Aitrait"
            />
        </div>
        <div  className="flex flex-col ">
        <p className="mb-2">Le :</p>
          <label htmlFor="date" className="text-xs ps-16"> date
            
          </label>
            <input type="date" id="date" {...register("date")}  />
        </div>
        <div className="flex gap-4  ">
          <button type="button" className="bg-[#F8D8B1] p-2 rounded-lg text-[#794822] cursor-pointer hover:bg-[#ecd3b4] min-w-[110px]">annuler</button>
          <button type="submit" className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1] cursor-pointer hover:bg-[#b66f38]">confirmer</button>
        </div>
      </form>
    </section>
  );
};

export default SerieModal;
