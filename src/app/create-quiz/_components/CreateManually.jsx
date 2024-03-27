'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineDelete } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";


const CreateManually = () => {

    const { register, handleSubmit ,reset} = useForm();
    const [questions, setQuestions] = useState([]);
    const [flag, setFlag] = useState(false);
    const [mcqFlag, setMcqFlag] = useState(false);
    const [mcqAns, setMcqAns] = useState(false)
    const [addFlag ,setAddFlag] = useState(false)

    const addShortAnswerQuestion = () => {
        setFlag(false)
        setMcqFlag(true)
        setQuestions([...questions, { type: 'sq', question: '', answer: '' }]);
    };
    

    
    const addTrueFalseQuestion = () => {
        setFlag(false)
        setMcqFlag(true)
        setAddFlag(true)
        setQuestions([...questions, { type: 'tf', question: '', options: ["true", "false"], answer :'' }]);
    };
    
    const addMCQuestion = () => {
        setFlag(false)
        setMcqFlag(false)
        setAddFlag(true)
        setQuestions([...questions, { type: 'mcq', question: '', options: [], answer : '' }]);
    };

    const addOption = (index) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[index].options.length + 1 === 4) 
        {
            setFlag(true);
            setMcqFlag (true)
        }
        updatedQuestions[index].options = [...updatedQuestions[index].options, '']; 
        setQuestions(updatedQuestions);
    };
    
    const addanswer = (index) => {
        setFlag(true);
        const updatedQuestions = [...questions];
        setAddFlag(false)
        
        if (updatedQuestions[index].options[0] === 'true') 
        {
            setFlag(true);
            return ;
        }
        if (updatedQuestions[index].options.length !== 4) 
        {
            setFlag(false);
            setMcqFlag (false)
        }
        else 
        {
            setMcqAns(true)
            setMcqFlag(false);
        }
    };

    const removeOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
        setMcqFlag(false)
        setFlag(false)
        setAddFlag(true)
    };

    const onSubmit = (data) => {
        console.log(data); 

    };

    const clearForm = () => {
        setQuestions([]);
        setFlag(false);
        setMcqFlag(false)
        setMcqFlag(false);
        setAddFlag(false)
        reset(); 
    }; 
    return (
        <div className=" mx-auto mt-16 mb-32  w-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Question Form</h1>
            <div className="flex mb-4 space-x-4">
                <button onClick={addShortAnswerQuestion} className="disabled:bg-gray-200 disabled:text-slate-500 disabled:border disabled:border-gray-300 bg-blue-500 text-white px-4 py-2 rounded">Add Short Answer Question</button>
                <button onClick={addTrueFalseQuestion} disabled={addFlag} className="disabled:bg-gray-200 disabled:text-slate-500 disabled:border disabled:border-gray-300 bg-blue-500 text-white px-4 py-2 rounded">Add True/False Question</button>
                <button onClick={addMCQuestion} disabled={addFlag} className="disabled:bg-gray-200 disabled:text-slate-500 disabled:border disabled:border-gray-300 bg-blue-500 text-white px-4 py-2 rounded">Add MCQ Question</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {questions.map((question, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-xl font-bold mb-2">Question {index + 1}</h3>
                        <input
                            type="text"
                            {...register(`questions[${index}].question`)}
                            placeholder="Enter question"
                            className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                        />
                        <input type="text" hidden value={question.type}
                            {
                                ...register(`questions[${index}].type`)
                            }
                        />
                        {question.type === 'sq' && (
                            <input
                                type="text"
                                {...register(`questions[${index}].answer`)}
                                placeholder="Enter answer"
                                className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                            />
                        )}                        
                        {question.type === 'tf' && (
                            <div>
                                <div>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <input
                                                type="text"
                                                {...register(`questions[${index}].options[${optionIndex}]`)}
                                                value={option}
                                                placeholder="enter 1 for true and 2 for false"
                                                className="border bg-gray-300 border-gray-300 px-4 py-2 rounded mb-2 w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {
                                    flag && <div >
                                    <input
                                        type="text"
                                        {...register(`questions[${index}].answer`)}
                                        placeholder="enter 1 for true and 2 for false"
                                        className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                                        />
                                    </div>
                                }
                                {
                                    questions[index].answer==='1'  && <button disabled={flag} type="button" onClick={() => { addanswer(index) }} className="bg-blue-500 text-white px-4 py-2 rounded">Show answer</button>
                                }
                                {
                                    questions[index].answer==='2'  && <button disabled={flag} type="button" onClick={() => { addanswer(index) }} className="bg-blue-500 text-white px-4 py-2 rounded">Show answer</button>
                                }
                                {
                                    !flag && questions[index].answer==='' &&<button disabled={flag} type="button" onClick={() => { addanswer(index) }} className="bg-blue-500 text-white px-4 py-2 rounded">Enter answer</button>
                                }
                            </div>
                        )}
                        {question.type === 'mcq'  &&  (
                            <div>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className='flex items-center'>
                                        <input
                                            type="text"
                                            key={optionIndex}
                                            {...register(`questions[${index}].options[${optionIndex}]`)}
                                            value={option}
                                            onChange={(e) => {
                                                const updatedOptions = [...question.options];
                                                updatedOptions[optionIndex] = e.target.value;
                                                const updatedQuestions = [...questions];
                                                updatedQuestions[index].options = updatedOptions;
                                                setQuestions(updatedQuestions);
                                            }}
                                            placeholder={`Option ${optionIndex + 1}`}
                                            className="border border-gray-300 px-4 py-1 rounded mb-2 w-full"
                                        />
                                        <div className='mb-2  flex items-center justify-end ms-10'>
                                            <button type="button" onClick={() => removeOption(index, optionIndex)} className="bg-red-500 text-white px-4 py-1 rounded flex justify-center items-center">&nbsp; <MdOutlineDelete className='w-5 h-5 font-semibold' /></button>
                                        </div>
                                    </div>
                                ))}
                                {
                                    mcqFlag && <button onClick={() => addanswer(index)} className="bg-blue-500 text-white px-4 py-2 rounded">Enter answer</button>
                                }
                                {
                                    mcqAns &&
                                        <div >
                                            <input
                                                type="text"
                                                {...register(`questions[${index}].answer]`)}
                                                placeholder="Enter 1 for option 1 ,2 for option 2 ..."
                                                className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                                            />
                                        </div>
                                }
                                {
                                    !flag && <button type="button" onClick={() => addOption(index)} className="bg-blue-500 flex items-center justify-center text-white px-4 py-2 rounded">Add Option&nbsp; <RiAddCircleLine className='w-5 h-5 font-semibold' /></button>
                                }
                            </div>
                        )}
                    </div>
                ))}
                <div className='flex items-center justify-start space-x-6'>
                    <button type="cancel" onClick={clearForm} className="bg-red-700 hover:bg-red-600 font-semibold text-white px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-emerald-700 hover:bg-emerald-600 font-semibold text-white px-4 py-2 rounded">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateManually;

