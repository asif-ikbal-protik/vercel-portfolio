import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getQueryFn } from '@/lib/queryClient';
import { Mail, Eye, Calendar, User, MessageSquare, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import type { Contact, PortfolioView } from '../../../shared/schema';

interface ContactsResponse {
  success: boolean;
  contacts: Contact[];
}

interface ViewsResponse {
  success: boolean;
  views: PortfolioView[];
  total: number;
}

const AdminDashboard = () => {
  const { data: contactsData } = useQuery<ContactsResponse>({
    queryKey: ['/api/contacts'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: viewsData } = useQuery<ViewsResponse>({
    queryKey: ['/api/portfolio-views'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const contacts = contactsData?.contacts || [];
  const views = viewsData?.views || [];
  const totalViews = viewsData?.total || 0;

  return (
    <div className="min-h-screen bg-black-100 text-white font-display p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple to-purple bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-white-200">Portfolio Analytics & Contact Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-purple/30 shadow-glow-blue hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white-200">Total Portfolio Views</CardTitle>
              <Eye className="h-4 w-4 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple">{totalViews}</div>
              <p className="text-xs text-white-200">Unique visitors tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-purple/30 shadow-glow-cyan hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white-200">Contact Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple">{contacts.length}</div>
              <p className="text-xs text-white-200">Messages received</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-purple/30 shadow-glow-purple hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white-200">Recent Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple">
                {views.filter((v: PortfolioView) => new Date(v.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-xs text-white-200">Views in last 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Messages */}
        <Card className="mb-8 bg-card border-purple/30 shadow-glow-gradient hover:shadow-glow-hover">
          <CardHeader>
            <CardTitle className="text-xl text-purple flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <p className="text-white-200 text-center py-8">No messages yet</p>
              ) : (
                contacts.map((contact: Contact) => (
                  <div key={contact.id} className="border border-purple/20 rounded-lg p-4 bg-black-100/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-purple" />
                        <span className="font-semibold text-purple">{contact.name}</span>
                        <span className="text-white-200 text-sm">{contact.email}</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple/20 text-purple">
                        {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-purple mb-2">{contact.subject}</h4>
                    <p className="text-white-200 text-sm leading-relaxed">{contact.message}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Views */}
        <Card className="bg-card border-purple/30 shadow-glow-gradient hover:shadow-glow-hover">
          <CardHeader>
            <CardTitle className="text-xl text-purple flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Portfolio Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {views.length === 0 ? (
                <p className="text-white-200 text-center py-8">No views tracked yet</p>
              ) : (
                views.slice(0, 10).map((view: PortfolioView) => (
                  <div key={view.id} className="flex items-center justify-between border border-purple/20 rounded-lg p-3 bg-black-100/50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-purple" />
                      <span className="text-white-200 text-sm">
                        {format(new Date(view.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-white-200">{view.ip_address}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back to Portfolio */}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-purple/30 text-purple hover:bg-purple/10"
          >
            <a href="/">← Back to Portfolio</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;