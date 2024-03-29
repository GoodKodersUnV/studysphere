
import React from "react";

const MyQuiz = ({params})=>{

    const [data, setData] = useState();


    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("/api/get-questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quizId: params.id }),
            });
            if (!response.ok) {
            throw new Error(`Error generating quiz: ${response.status}`);
            }
            const responseData = await response.json();
            setData(responseData.questions)
            
            
        } catch (error) {
            console.error("Error generating quiz:", error.message);
        }
        };

        fetchData();
    }, [params.id]);



    return (
        <h1>Yet to implement</h1>
    )

}


export default MyQuiz;
