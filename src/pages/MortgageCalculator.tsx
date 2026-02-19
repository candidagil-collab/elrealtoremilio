import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Navbar from "@/components/Navbar";
import { DollarSign, Percent, CalendarDays, TrendingDown } from "lucide-react";

const COLORS = {
  principal: "hsl(217, 82%, 23%)",
  interest: "hsl(217, 60%, 50%)",
  tax: "hsl(30, 80%, 55%)",
  insurance: "hsl(150, 50%, 45%)",
  hoa: "hsl(280, 50%, 55%)",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const formatCurrencyFull = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4200);
  const [homeInsurance, setHomeInsurance] = useState(1800);
  const [hoaFees, setHoaFees] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const downPayment = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPayment;

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0) {
      monthlyPrincipalInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPrincipalInterest = loanAmount / numPayments;
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHoa = hoaFees;
    const totalMonthly = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyHoa;

    // Amortization schedule
    const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = loanAmount;
    let totalInterest = 0;

    for (let i = 1; i <= numPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPrincipalInterest - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;

      schedule.push({
        month: i,
        payment: monthlyPrincipalInterest,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    // First month breakdown for pie chart
    const firstInterest = schedule.length > 0 ? schedule[0].interest : 0;
    const firstPrincipal = schedule.length > 0 ? schedule[0].principal : 0;

    return {
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyHoa,
      totalMonthly,
      totalInterest,
      schedule,
      firstPrincipal,
      firstInterest,
    };
  }, [loanAmount, interestRate, loanTerm, propertyTax, homeInsurance, hoaFees]);

  const pieData = [
    { name: "Principal", value: calculations.firstPrincipal, color: COLORS.principal },
    { name: "Interest", value: calculations.firstInterest, color: COLORS.interest },
    { name: "Property Tax", value: calculations.monthlyTax, color: COLORS.tax },
    { name: "Insurance", value: calculations.monthlyInsurance, color: COLORS.insurance },
    ...(calculations.monthlyHoa > 0
      ? [{ name: "HOA", value: calculations.monthlyHoa, color: COLORS.hoa }]
      : []),
  ];

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: chartRef, isVisible: chartVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          {/* Header */}
          <div ref={headerRef} className={`scroll-reveal ${headerVisible ? "visible" : ""} text-center mb-12`}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
              Mortgage Calculator
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimate your monthly payment and understand the full cost of homeownership
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Loan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Home Price */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="font-body text-sm">Home Price</Label>
                      <span className="font-body text-sm font-semibold text-primary">{formatCurrency(homePrice)}</span>
                    </div>
                    <Slider
                      value={[homePrice]}
                      onValueChange={([v]) => setHomePrice(v)}
                      min={50000}
                      max={1500000}
                      step={5000}
                    />
                    <Input
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="font-body"
                    />
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="font-body text-sm">Down Payment</Label>
                      <span className="font-body text-sm font-semibold text-primary">
                        {downPaymentPercent}% ({formatCurrency(downPayment)})
                      </span>
                    </div>
                    <Slider
                      value={[downPaymentPercent]}
                      onValueChange={([v]) => setDownPaymentPercent(v)}
                      min={0}
                      max={50}
                      step={1}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="font-body text-sm">Interest Rate</Label>
                      <span className="font-body text-sm font-semibold text-primary">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={([v]) => setInterestRate(v)}
                      min={1}
                      max={12}
                      step={0.125}
                    />
                  </div>

                  {/* Loan Term */}
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Loan Term</Label>
                    <div className="flex gap-2">
                      {[15, 20, 30].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`flex-1 py-2 px-3 rounded-lg font-body text-sm font-medium transition-colors ${
                            loanTerm === term
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {term} yr
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Tax */}
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Annual Property Tax</Label>
                    <Input
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(Number(e.target.value))}
                      className="font-body"
                    />
                  </div>

                  {/* Home Insurance */}
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Annual Home Insurance</Label>
                    <Input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(Number(e.target.value))}
                      className="font-body"
                    />
                  </div>

                  {/* HOA */}
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Monthly HOA Fees</Label>
                    <Input
                      type="number"
                      value={hoaFees}
                      onChange={(e) => setHoaFees(Number(e.target.value))}
                      className="font-body"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Monthly Payment Summary */}
              <Card className="border-0 shadow-xl bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <p className="font-body text-sm text-primary-foreground/70 mb-1">Estimated Monthly Payment</p>
                  <p className="font-display text-5xl md:text-6xl font-bold mb-6">
                    {formatCurrencyFull(calculations.totalMonthly)}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary-foreground/60" />
                      <div>
                        <p className="text-xs text-primary-foreground/60">P&I</p>
                        <p className="font-body text-sm font-semibold">
                          {formatCurrencyFull(calculations.monthlyPrincipalInterest)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-primary-foreground/60" />
                      <div>
                        <p className="text-xs text-primary-foreground/60">Tax</p>
                        <p className="font-body text-sm font-semibold">{formatCurrencyFull(calculations.monthlyTax)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary-foreground/60" />
                      <div>
                        <p className="text-xs text-primary-foreground/60">Insurance</p>
                        <p className="font-body text-sm font-semibold">{formatCurrencyFull(calculations.monthlyInsurance)}</p>
                      </div>
                    </div>
                    {calculations.monthlyHoa > 0 && (
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-primary-foreground/60" />
                        <div>
                          <p className="text-xs text-primary-foreground/60">HOA</p>
                          <p className="font-body text-sm font-semibold">{formatCurrencyFull(calculations.monthlyHoa)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card ref={chartRef} className={`scroll-reveal ${chartVisible ? "visible" : ""} border shadow-lg`}>
                <CardHeader>
                  <CardTitle className="font-display text-xl">Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrencyFull(value)}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid hsl(var(--border))",
                            fontFamily: "Lato, sans-serif",
                          }}
                        />
                        <Legend
                          formatter={(value) => <span className="font-body text-sm">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary stats */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-display text-lg font-semibold text-foreground">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Total Interest</p>
                      <p className="font-display text-lg font-semibold text-foreground">
                        {formatCurrency(calculations.totalInterest)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amortization Table */}
              <Card className="border shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-xl">Amortization Schedule</CardTitle>
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="font-body text-sm text-primary hover:underline"
                  >
                    {showAmortization ? "Hide" : "Show"} Table
                  </button>
                </CardHeader>
                {showAmortization && (
                  <CardContent>
                    <div className="max-h-[400px] overflow-y-auto rounded-lg border">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-secondary">
                          <tr>
                            <th className="font-body font-semibold text-left p-3 text-foreground">Month</th>
                            <th className="font-body font-semibold text-right p-3 text-foreground">Payment</th>
                            <th className="font-body font-semibold text-right p-3 text-foreground">Principal</th>
                            <th className="font-body font-semibold text-right p-3 text-foreground">Interest</th>
                            <th className="font-body font-semibold text-right p-3 text-foreground">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculations.schedule.map((row) => (
                            <tr
                              key={row.month}
                              className={`border-t ${row.month % 12 === 0 ? "bg-primary/5" : ""}`}
                            >
                              <td className="font-body p-3 text-muted-foreground">
                                {row.month}
                                {row.month % 12 === 0 && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    Yr {row.month / 12}
                                  </Badge>
                                )}
                              </td>
                              <td className="font-body p-3 text-right text-foreground">{formatCurrencyFull(row.payment)}</td>
                              <td className="font-body p-3 text-right text-foreground">{formatCurrencyFull(row.principal)}</td>
                              <td className="font-body p-3 text-right text-muted-foreground">{formatCurrencyFull(row.interest)}</td>
                              <td className="font-body p-3 text-right text-foreground">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MortgageCalculator;
