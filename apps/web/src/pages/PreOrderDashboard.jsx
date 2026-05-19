
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { Download, Loader2, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const PreOrderDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    setIsAuthenticated(false);
    setOrders([]);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const records = await pb.collection('preorders').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setOrders(records);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await pb.collection('preorders').update(id, { paymentStatus: newStatus }, { $autoCancel: false });
      setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: newStatus } : order));
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update status');
    }
  };

  const exportData = () => {
    const headers = ['Email', 'Quantity', 'Message', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(o => 
        `"${o.email}",${o.quantity},"${(o.message || '').replace(/"/g, '""')}","${o.paymentStatus}","${format(new Date(o.created), 'yyyy-MM-dd HH:mm')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `preorders_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'All' || order.paymentStatus === statusFilter
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Login | Hidden Genius Labs</title>
        </Helmet>
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground"
                required 
              />
            </div>
            <Button type="submit" disabled={isLoggingIn} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Pre-Order Dashboard | Hidden Genius Labs</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pre-Order Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage book pre-orders and payments.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={exportData} className="border-border text-foreground hover:bg-muted">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="secondary" onClick={handleLogout} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Label className="whitespace-nowrap text-foreground">Filter Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Total Orders: {filteredOrders.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Date</TableHead>
                  <TableHead className="text-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-foreground font-semibold">Qty</TableHead>
                  <TableHead className="text-foreground font-semibold">Message</TableHead>
                  <TableHead className="text-foreground font-semibold">Status</TableHead>
                  <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-muted/30">
                      <TableCell className="text-foreground whitespace-nowrap">
                        {format(new Date(order.created), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">{order.email}</TableCell>
                      <TableCell className="text-foreground">{order.quantity}</TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate" title={order.message}>
                        {order.message || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`
                          ${order.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                          ${order.paymentStatus === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                          ${order.paymentStatus === 'Cancelled' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                        `}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select 
                          value={order.paymentStatus} 
                          onValueChange={(val) => updateStatus(order.id, val)}
                        >
                          <SelectTrigger className="w-[130px] ml-auto h-8 text-xs bg-input border-border text-foreground">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Mark Pending</SelectItem>
                            <SelectItem value="Paid">Mark Paid</SelectItem>
                            <SelectItem value="Cancelled">Mark Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderDashboard;
