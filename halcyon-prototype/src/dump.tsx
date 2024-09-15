import React, {useState, useCallback, useMemo} from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import "easymde/dist/easymde.min.css";

const [value, setValue] = useState("Initial value");

const onChange = useCallback((value: string) => {
  setValue(value);
}, []);

const customRendererOptions = useMemo(() => {
  return {
    previewRender() {
      return `<div>${value}</div>`;
    },
  } as SimpleMDE.Options;
}, []);

<SimpleMdeReact 
      options={customRendererOptions}
      value={value} 
      onChange={onChange} 
    />
