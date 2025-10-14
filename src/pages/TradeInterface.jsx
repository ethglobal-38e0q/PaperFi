import PerpChartLight from "../components/charts/PerpChart";

export default function TradeInterface() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Trade Interface</h1>
      <PerpChartLight />
    </div>
  )
} 