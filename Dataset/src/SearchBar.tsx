import { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSearch(inputValue);
    }

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <h3 className='ms-2 mt-3 mb-4'>Buscar</h3>
            <div className='row'>
                <div className='col-11'>
                    <input
                    className='form-control custom-input'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Buscar..."
                    />
                </div>
                <div className='col-1'>
                    <button type="submit" className="btn btn-success w-100">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;
