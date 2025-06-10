import React from "react";
import { Button } from "../../components";

interface EventData {
  id: string;
  name: string;
  description: string;
  images: string[];
  startDate: string;
  endDate: string;
  location: string;
  totalGuests?: number;
  category?: string;
  Actions?: React.ReactNode;
}

interface EventTableProps {
  data: EventData[];
}

const EventTable: React.FC<EventTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Images
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Start Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              End Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Location
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Guests
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.name ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.description ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 space-x-1">
                {event
                  ? event.images
                      .slice(0, 2)
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Event"
                          className="inline-block h-10 w-10 object-cover rounded"
                        />
                      ))
                  : "-"}
                {event.images.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{event.images.length - 2} more
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.startDate ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.endDate ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.location ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.totalGuests ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {event.category ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                <div className="flex ">
                  <div className="mr-2">
                    <Button
                      variant="outline"
                      type="button"
                      className="bg-[#8e002e] flex w-full mt-7 font-[600] text-[16px] cursor-pointer justify-center rounded-md  text-sm/6 font-open-sans text-white shadow-xs "
                    >
                      edit
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    type="button"
                    className="bg-[#8e002e] flex w-full mt-7 font-[600] text-[16px] cursor-pointer justify-center rounded-md  text-sm/6 font-open-sans text-white shadow-xs "
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
