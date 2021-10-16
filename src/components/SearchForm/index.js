import React, {useState, useRef} from 'react'

export default function SearchForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState("");
    const typingTimeoutRef = useRef(null)
    function handleSearchTermChange(e) {
        const value = e.target.value
        setSearchTerm(value)
        if(!onSubmit) return;

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            }
            onSubmit(formValues)
        }, 300)
      
       
    }
    return (
       <form>
           <input placeholder={props.placeholder} type="text" value={searchTerm} onChange={handleSearchTermChange}  className="input-search" />
       </form>
    )
}
