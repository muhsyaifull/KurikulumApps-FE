import { Input} from 'antd';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const InputSearch = () => (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
  );

export default InputSearch;