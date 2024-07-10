import React from 'react';
import MyInput from './UI/input/MyInput'; 
import MySelect from './UI/select/MySelect';

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder="Поиск"
            />
            <MySelect
                value={filter.type}
                onChange={selectedType => setFilter({ ...filter, type: selectedType })}
                options={[
                    { value: '', name: 'Все типы аварий' },
                    { value: 'Порыв', name: 'Порыв' },
                    { value: 'Утечка', name: 'Утечка' },
                    { value: 'Колонка уличная', name: 'Колонка уличная' },
                    { value: 'Некачественная вода', name: 'Некачественная вода' },
                    { value: 'Закупорка', name: 'Закупорка' },
                    { value: 'Другое', name: 'Другое' }
                ]}
                defaultValue="Выберите тип аварии"
            />
            <MySelect
                value={filter.prioritySort}
                onChange={selectedPrioritySort => setFilter({ ...filter, prioritySort: selectedPrioritySort })}
                options={[
                    { value: '', name: 'Все приоритеты' },
                    { value: 'asc', name: 'По возрастанию' },
                    { value: 'desc', name: 'По убыванию' }
                ]}
                defaultValue="Сортировка по приоритету"
            />
        </div>
    );
};

export default PostFilter;
