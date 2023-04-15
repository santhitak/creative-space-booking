import { RadioGroup } from '@headlessui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RadioChoice } from './BookingModal';
import { useState } from 'react';

interface Props {
  purpose: RadioChoice[];
}

const PurposeRadio = (props: Props) => {
  const { purpose } = props;
  const [selected, setSelected] = useState(purpose[0]);

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="space-y-2">
        {purpose.map((item: RadioChoice) => (
          <RadioGroup.Option
            key={item.name}
            value={item}
            className={({ active, checked }) =>
              `${
                active
                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-300'
                  : ''
              }
                  ${
                    checked
                      ? 'bg-blue-800 bg-opacity-90 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium  ${
                          checked ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <BsFillCheckCircleFill className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default PurposeRadio;
