import ImageGeneration from "@/components/ImageGeneration/ImageGeneration";
import LeftNav from "@/components/LeftNav/LeftNav";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";


export default function Home() {
  return (
    <>
    <PrivateRoute>
      <div className="flex w-full fixed h-[100vh]">
        <div className="w-[20%]">
          <LeftNav name="imageGeneration"/>
        </div>
        <div className="w-[80%]"> 
          <ImageGeneration />
        </div>
      </div>
      </PrivateRoute>
    </>
  );
}
