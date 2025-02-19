import { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const AddName = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");

  return (
    <div className="flex flex-col items-center justify- min-h-screen bg-white">
      <div className="max-w-lg w-full p-6 ">
        {/* Title */}
        <div className="flex flex-col  kurdish-font mx-auto">
        <h1 className="text-3xl font-bold  mb-2 flex justify-end  ">ناوێکی نوێ بنێره</h1>
        <p className=" text-gray-600 mb-6 flex justify-start  ">
        هه‌ركاتێك ناوێكی نوێمان بۆدێت ئه‌وا دوای ماوه‌یه‌ك هه‌ڵده‌ستین به‌ زیادكردنی دوای پێداچوونه‌وه‌


        </p>
        </div>

        {/* Form */}
        <Form layout="vertical" form={form} className="space-y-4 kurdish-font">
          {/* Name Input */}
          <Form.Item> <p className="block text-right w-full kurdish-font text-xl mb-2 ">ناو</p>
            <Input 
              placeholder="..ناوێک بنووسە" 
              className="text-right bg-blue-50 border border-teal-300 rounded-md kurdish-font"
              dir="rtl"
              style={{ 
                borderColor: '#5eead4',  // teal-300 color
                borderRadius: '0.375rem',   // rounded-md equivalent
                padding: '1rem',
                
              }}
            />
          </Form.Item>

          {/* Meaning Input */}
          <Form.Item >
           <span className="block text-right w-full kurdish-font text-xl mb-2">مانای ناوەکە</span>
            <Input 
            className="text-right kurdish-font "
              placeholder="مانای ئەو ناوەی دەینێریت چییە ؟" 
              dir="rtl"
              style={{ 
                borderColor: '#5eead4',  // teal-300 color
                borderRadius: '0.375rem',   // rounded-md equivalent
                padding: '1rem',
                
              }}
            />
          </Form.Item>

          {/* Gender Select */}
          <Form.Item >
          <span className="block text-right w-full kurdish-font text-xl mb-2">ڕەگەز</span>
            <Select 
              className='w-full text-right kurdish-font' 
              dir="rtl"
              placeholder="ڕەگەز هەڵبژێرە"
              style={{ 
                borderColor: '#5eead4',
                borderRadius: '0.375rem',
                height: '50px'
              }}
              dropdownStyle={{
                padding: '8px'
              }}
            >
              <Select.Option value="کوڕ" className="text-right kurdish-font">کوڕ</Select.Option>
              <Select.Option value="کچ" className="text-right kurdish-font">کچ</Select.Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="secondary" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg kurdish-font"
            style={{
              backgroundColor: '#5eead4',
              borderColor: '#5eead4',
              borderRadius: '0.375rem',
              padding: '1.5rem',
              color: 'white',
              marginTop: '1rem',
            }}
            >
              ناردن
            </Button>
          </Form.Item>
        </Form>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-4">
        
          <span className="text-orange-500 font-semibold">له‌ لایه‌ن دره‌ختی گه‌شه‌پێده‌ران دروست كراوه‌

          </span>  
        </p>
      </div>
    </div>
  );
};

export default AddName;
