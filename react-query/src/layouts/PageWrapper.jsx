import { useIsFetching } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function PageWrapper({children, className}){
    const isFetching = useIsFetching()
    
    return (
        <div className={`w-screen flex flex-col items-center py-32 ${className}`}>
            {isFetching > 0 && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {children}
            <ReactQueryDevtools />
        </div>
    )
}

