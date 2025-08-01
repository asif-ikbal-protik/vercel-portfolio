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
    <div className="min-h-screen bg-midnight text-light-text font-sora p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-subtext">Portfolio Analytics & Contact Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-dark-surface border-sky-accent/30 shadow-glow-blue hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-subtext">Total Portfolio Views</CardTitle>
              <Eye className="h-4 w-4 text-sky-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sky-accent">{totalViews}</div>
              <p className="text-xs text-subtext">Unique visitors tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-cyan-accent/30 shadow-glow-cyan hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-subtext">Contact Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-cyan-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-accent">{contacts.length}</div>
              <p className="text-xs text-subtext">Messages received</p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-sky-accent/30 shadow-glow-purple hover:shadow-glow-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-subtext">Recent Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-sky-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sky-accent">
                {views.filter((v: PortfolioView) => new Date(v.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-xs text-subtext">Views in last 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Messages */}
        <Card className="mb-8 bg-dark-surface border-sky-accent/30 shadow-glow-gradient hover:shadow-glow-hover">
          <CardHeader>
            <CardTitle className="text-xl text-sky-accent flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <p className="text-subtext text-center py-8">No messages yet</p>
              ) : (
                contacts.map((contact: Contact) => (
                  <div key={contact.id} className="border border-sky-accent/20 rounded-lg p-4 bg-midnight/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-sky-accent" />
                        <span className="font-semibold text-sky-accent">{contact.name}</span>
                        <span className="text-subtext text-sm">{contact.email}</span>
                      </div>
                      <Badge variant="secondary" className="bg-sky-accent/20 text-sky-accent">
                        {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-cyan-accent mb-2">{contact.subject}</h4>
                    <p className="text-subtext text-sm leading-relaxed">{contact.message}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Views */}
        <Card className="bg-dark-surface border-cyan-accent/30 shadow-glow-gradient hover:shadow-glow-hover">
          <CardHeader>
            <CardTitle className="text-xl text-cyan-accent flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Portfolio Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {views.length === 0 ? (
                <p className="text-subtext text-center py-8">No views tracked yet</p>
              ) : (
                views.slice(0, 10).map((view: PortfolioView) => (
                  <div key={view.id} className="flex items-center justify-between border border-cyan-accent/20 rounded-lg p-3 bg-midnight/50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-cyan-accent" />
                      <span className="text-subtext text-sm">
                        {format(new Date(view.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-subtext">{view.ip_address}</span>
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
            className="border-sky-accent/30 text-sky-accent hover:bg-sky-accent/10"
          >
            <a href="/">← Back to Portfolio</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;